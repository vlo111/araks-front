import { Modal } from 'components/modal';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { Col, Row } from 'antd';
import { ShortestPathSearch } from '../search/shortest-path';
import { useMemo, useState } from 'react';
import { Button } from 'components/button';
import { Wrapper } from './shortest-wrapper';
import { useGetShortestPath } from 'api/visualisation/use-get-shortest-path';
import { formattedSearchData } from 'components/layouts/components/visualisation/helpers/format-node';

export const ShortestPathModal = () => {
  const { graph } = useGraph() ?? {};

  const [search, setSearch] = useState<string>();

  const [noResult, setNoResult] = useState<boolean>();

  const [end, setEnd] = useState<string>();

  const { openShortestPath, finishShortestPath } = useGraph() ?? {};

  const { mutate } = useGetShortestPath({
    enabled: !!end,
    onSuccess: ({ data }) => {
      const formatted = formattedSearchData(data.nodes, data.edges);

      if (formatted.nodes.length) {
        graph.data(formatted);

        graph.render();

        finishShortestPath();
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

  const targetNode = useMemo(() => {
    return graph
      ?.getNodes()
      ?.find((n) => n.getID() === end)
      ?.getModel() as { label: string; color: string; nodeTypeName: string };
  }, [graph, end]);

  const close = () => {
    finishShortestPath();
    setEnd(undefined);
    setSearch(undefined);
  };

  const handleShowPath = () => {
    mutate({
      start: openShortestPath?.id ?? '',
      end: end ?? '',
    });
  };

  const setHandleSearch = (item: string) => {
    setSearch(item);
    setNoResult(false);
  };

  return (
    <>
      <Modal open={openShortestPath?.isOpened} footer={false} closable={false} className="shortest-project-modal">
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
              <ShortestPathSearch setEnd={setEnd} search={search} setSearch={setHandleSearch} />
              {targetNode ? (
                <div className="container">
                  <div className="type">
                    <div className="dot" style={{ background: targetNode?.color }} />
                    <div className="type-name">{targetNode?.nodeTypeName}</div>
                  </div>
                  <div className="node">
                    <div className="name">{targetNode?.label}</div>
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
      </Modal>
    </>
  );
};
