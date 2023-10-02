import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { Col, Row } from 'antd';
import { ShortestPathSearch } from '../../search/shortest-path';
import { useMemo, useState } from 'react';
import { Button } from 'components/button';
import { Wrapper } from './shortest-wrapper';
import { useGetShortestPath } from 'api/visualisation/use-get-shortest-path';
import { formattedData } from 'components/layouts/components/visualisation/helpers/format-node';

export const ShortestPathWrapper = () => {
  const { graph, setGraphInfo } = useGraph() ?? {};

  const [search, setSearch] = useState<string>();

  const [noResult, setNoResult] = useState<boolean>();

  const [target, setTarget] = useState<{ id: string; typeName: string; name: string; color: string }>();

  const { openShortestPath, finishShortestPath } = useGraph() ?? {};

  const { mutate } = useGetShortestPath({
    onSuccess: ({ data }) => {
      if (data) {
        const formatted = formattedData(data.nodes, data.edges, data.relationsCounts);

        if (formatted.nodes.length) {
          graph.data(formatted);

          graph.render();

          setGraphInfo({
            nodeCount: formatted.nodes.length ?? 0,
          });

          close();
        } else {
          setNoResult(true);
        }
      } else {
        setNoResult(true);
      }
    },
  });

  const sourceNode = useMemo(() => {
    return graph
      ?.getNodes()
      ?.find((n) => n.getID() === openShortestPath?.id)
      ?.getModel() as { label: string; color: string; nodeTypeName: string };
  }, [graph, openShortestPath?.id]);

  const close = () => {
    finishShortestPath();
    setTarget(undefined);
    setSearch(undefined);
    setNoResult(false);
  };

  const handleShowPath = () => {
    mutate({
      start: openShortestPath?.id ?? '',
      end: target?.id ?? '',
    });
  };

  const setHandleSearch = (item: string) => {
    setSearch(item);
    setNoResult(false);
  };

  return (
    <>
      <Wrapper>
        <Row gutter={[12, 12]}>
          <Col className="header" span={24}>
            Shortest path
          </Col>
          <Col className="source-section" span={24}>
            <span className="name">Source</span>
            <div className="container">
              <div className="type">
                <div className="dot" style={{ background: sourceNode?.color }} />
                <div className="type-name">{sourceNode?.nodeTypeName}</div>
              </div>
              <div className="node">
                <div className="name">{sourceNode?.label}</div>
              </div>
            </div>
          </Col>
          <Col className="source-section" span={24}>
            <span className="name">Target</span>
            <ShortestPathSearch setTarget={setTarget} search={search} setSearch={setHandleSearch} />
            {target ? (
              <div className="container">
                <div className="type">
                  <div className="dot" style={{ background: target?.color }} />
                  <div className="type-name">{target?.typeName}</div>
                </div>
                <div className="node">
                  <div className="name">{target?.name}</div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {noResult && <div className="not-result">NO RESULT</div>}
          </Col>
          <Row gutter={[16, 16]} justify="center" style={{ width: '100%', margin: '2rem 0' }}>
            <Col span={24}>
              <Button disabled={noResult} type="primary" block onClick={handleShowPath}>
                Show Path
              </Button>
            </Col>
            <Col span={24}>
              <Button style={{ marginRight: 8 }} onClick={close} block>
                Cancel
              </Button>
            </Col>
          </Row>
        </Row>
      </Wrapper>
    </>
  );
};
